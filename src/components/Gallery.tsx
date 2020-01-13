import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import GridGallery from 'react-grid-gallery';
import * as Sticky from 'react-stickynode';
import CloseImg from '../assets/images/close.svg';
import GalleryImg from '../assets/images/gallery';
import galleryImages, { galleryCategories } from '../content/gallery';
import l from '../styles/layout';
import { borders, colors, spacing, z } from '../styles/theme';
import t from '../styles/typography';
import { FilterPrimaryCategory } from '../types/filter';
import { GalleryImageData } from '../types/gallery';
import { isDesktop, isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import FilterBar, { ClearButton } from './FilterBar';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const Tag = styled(l.Space)(
  {
    border: borders.red,
    borderRadius: borders.radius,
    cursor: 'pointer',
    padding: spacing.t,
  },
  ({ active }: { active: boolean }) => ({
    background: active ? colors.red : colors.background,
    color: active ? colors.white : colors.red,
  }),
);

interface State {
  selectedTags: string[];
  showTags: boolean;
}

class Gallery extends React.Component<{}, State> {
  state = {
    selectedTags: [],
    showTags: true,
  };

  clearTags = () => {
    this.setState({ selectedTags: [] });
    scrollToId('gallery-top', {
      offset: isDesktop() ? -183 : -226,
    });
  };

  filterImages = (
    searchValue: string,
    categoryId: string,
    subCategoryId: string,
  ) => {
    const { selectedTags } = this.state;
    const filteredImages = galleryImages.filter((image: GalleryImageData) => {
      const isValidCategory =
        R.equals(categoryId, 'all') || R.equals(image.categoryId, categoryId);
      const isValidSubCategory =
        R.equals(subCategoryId, 'all') ||
        R.equals(image.subCategoryId, subCategoryId);
      const containsTags =
        R.isEmpty(selectedTags) ||
        R.reduce(
          (containsTagsValue: boolean, tag: string) => {
            return containsTagsValue || R.contains(tag, selectedTags);
          },
          false,
          image.tags,
        );
      const values = R.values(
        R.pick(['caption', 'categoryId', 'subCategoryId'], image),
      );

      return (
        isValidCategory &&
        isValidSubCategory &&
        containsTags &&
        R.reduce(
          (containsSearchValue: boolean, value: string) => {
            return (
              containsSearchValue ||
              (value
                ? R.contains(searchValue.toLowerCase(), value.toLowerCase())
                : false)
            );
          },
          false,
          values,
        )
      );
    });
    return filteredImages.map((image: GalleryImageData) => ({
      ...image,
      tags: undefined,
    }));
  };

  handleSelectTag = (tag: string) => {
    const { selectedTags } = this.state;
    if (R.contains(tag, selectedTags)) {
      this.setState({
        selectedTags: selectedTags.filter((tg: string) => !R.equals(tag, tg)),
      });
    } else {
      this.setState({
        selectedTags: [...selectedTags, tag],
      });
    }
    scrollToId('gallery-top', {
      offset: isDesktop() ? -183 : -226,
    });
  };

  render() {
    const { selectedTags, showTags } = this.state;
    const tags: string[] = [];
    R.map((image: GalleryImageData) => {
      R.map((tag: string) => {
        if (!R.contains(tag, tags)) {
          tags.push(tag);
        }
      }, image.tags);
    }, galleryImages);

    const sortedCategories = R.sortBy(
      (category: FilterPrimaryCategory) => category.name,
      galleryCategories,
    );
    const sortedTags = R.sortBy((tag: string) => tag, tags);

    return (
      <div>
        <t.Title center pb={spacing.ml}>
          <l.FlexCentered>
            <l.Space mr={spacing.ml}>
              <GalleryImg side={[spacing.xxl, spacing.xxl, spacing.xxxxl]} />
            </l.Space>
            Gallery
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}
        >
          <FilterBar
            categories={sortedCategories}
            categoryLabel="Category:"
            legend={
              <t.TextButton
                border={borders.red}
                color={colors.red}
                hoverStyle="underline"
                mt={[spacing.sm, 0, 0]}
                onClick={() => {
                  this.setState({ showTags: !showTags });
                  scrollToId('gallery-top', {
                    offset: isDesktop() ? -183 : -226,
                  });
                }}
              >
                {showTags ? 'Hide' : 'Show'} tags
              </t.TextButton>
            }
            legendOnBottom
            subCategoryLabel="Subcategory:"
            searchLabel="Search Gallery:"
            scrollEndId="#gallery-end"
          >
            {({ searchValue, categoryId, subCategoryId }) => (
              <div>
                {showTags && (
                  <Sticky
                    enabled={isTabletUp()}
                    innerZ={z.mid}
                    top={isDesktop() ? 143 : 186}
                    bottomBoundary="#gallery-end"
                  >
                    <l.Flex
                      background={colors.background}
                      boxShadow="0 5px 5px -5px"
                      pt={spacing.t}
                      isWrap
                      width="100%"
                    >
                      {sortedTags.map((tag: string, index: number) => (
                        <React.Fragment key={tag}>
                          <Tag
                            active={R.contains(tag, selectedTags)}
                            onClick={() => this.handleSelectTag(tag)}
                            mb={spacing.s}
                          >
                            {tag}
                          </Tag>
                          {index < sortedTags.length - 1 && (
                            <l.Space width={spacing.s} />
                          )}
                        </React.Fragment>
                      ))}
                      {!R.isEmpty(selectedTags) && (
                        <ClearButton
                          height={spacing.ml}
                          ml={spacing.s}
                          mt={`-${spacing.t}`}
                          onClick={this.clearTags}
                          src={CloseImg}
                        />
                      )}
                    </l.Flex>
                  </Sticky>
                )}
                <l.GalleryWrapper id="gallery-top" pt={spacing.m}>
                  <GridGallery
                    enableImageSelection={false}
                    images={this.filterImages(
                      searchValue,
                      categoryId,
                      subCategoryId,
                    )}
                    rowHeight={300}
                    showImageCount={false}
                  />
                </l.GalleryWrapper>
              </div>
            )}
          </FilterBar>
          <div id="gallery-end" />
        </l.Page>
        <Newsletter />
        <l.Space height={100} />
      </div>
    );
  }
}

export default withScroll(Gallery);

import { parse } from 'query-string';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as Sticky from 'react-stickynode';
import CloseImg from '../assets/images/close.svg';
import l from '../styles/layout';
import { breakpoints, colors, spacing, z } from '../styles/theme';
import t from '../styles/typography';
import { FilterCategory, FilterPrimaryCategory } from '../types/filter';
import { isTabletUp } from '../utils/screensize';
import { SelectInput, TextInput } from './Form/Input';

const FilterBarWrapper = styled(l.FlexColumn)({
  background: colors.background,
  [breakpoints.tablet]: {
    flexDirection: 'column',
  },
});

export const ClearButton = styled(l.Img)({
  cursor: 'pointer',
  [breakpoints.mobile]: {
    position: 'absolute',
    right: 0,
  },
});

export interface FilterProps {
  searchValue: string;
  categoryId: string;
  subCategoryId: string;
}

interface Props {
  categories: FilterPrimaryCategory[];
  categoryLabel: string;
  searchLabel: string;
  subCategoryLabel: string;
  scrollEndId: string;
  legend?: JSX.Element;
  legendOnBottom?: boolean;
  lowerLegend?: JSX.Element;
  children(props: FilterProps): JSX.Element;
}

interface State {
  categoryId: string;
  searchValue: string;
  subCategoryId: string;
}

const initialFiltersState = {
  categoryId: 'all',
  searchValue: '',
  subCategoryId: 'all',
};

class FilterBar extends React.Component<Props & RouteComponentProps, State> {
  constructor(props: Props & RouteComponentProps) {
    super(props);

    const { categoryId, searchValue, subCategoryId } = parse(
      props.location.search,
    );

    this.state = {
      categoryId: categoryId ? `${categoryId}` : 'all',
      searchValue: searchValue ? `${searchValue}` : '',
      subCategoryId: subCategoryId ? `${subCategoryId}` : 'all',
    };
  }

  clearFilters = () => {
    this.setState(initialFiltersState);
  };

  handleFilterChange = (field: string) => (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    this.setState({
      ...this.state,
      subCategoryId: R.equals(field, 'categoryId')
        ? 'all'
        : this.state.subCategoryId,
      [field]: e.currentTarget.value,
    });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  render() {
    const {
      children,
      categories,
      categoryLabel,
      legend,
      legendOnBottom,
      lowerLegend,
      scrollEndId,
      searchLabel,
      subCategoryLabel,
    } = this.props;
    const { categoryId, searchValue, subCategoryId } = this.state;

    const category = R.find(
      (cat: FilterPrimaryCategory) => R.equals(cat.id, categoryId),
      categories,
    );

    return (
      <div>
        <Sticky
          enabled={isTabletUp()}
          innerZ={z.high}
          top="#nav-end"
          bottomBoundary={scrollEndId}>
          <div id="filter-bar-end">
            <FilterBarWrapper
              alignTop
              pb={spacing.ml}
              pt={spacing.s}
              width="100%">
              <l.Flex
                columnOnMobile={legendOnBottom}
                columnRevOnMobile={!legendOnBottom}
                mb={spacing.m}
                spaceBetween
                width="100%">
                <l.Flex
                  columnOnMobile
                  mb={[0, spacing.ml, 0]}
                  position="relative"
                  width={['100%', 'auto']}>
                  <l.Space
                    mb={[spacing.sm, 0]}
                    mr={[0, spacing.sm]}
                    width={['100%', 'auto']}>
                    <t.HelpText mb={spacing.t}>{searchLabel}</t.HelpText>
                    <TextInput
                      onChange={this.handleSearchChange}
                      value={searchValue}
                      width="100%"
                    />
                  </l.Space>
                  <l.Space
                    mb={[spacing.sm, 0]}
                    mr={[0, spacing.sm]}
                    width={['100%', 'auto']}>
                    <t.HelpText mb={spacing.t}>{categoryLabel}</t.HelpText>
                    <SelectInput
                      mr={R.equals(categoryId, 'all') ? spacing.m : spacing.sm}
                      onChange={this.handleFilterChange('categoryId')}
                      value={categoryId}
                      width="100%">
                      <option value="all">All</option>
                      {categories.map((cat: FilterPrimaryCategory) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </SelectInput>
                  </l.Space>
                  {category && category.subCategories && (
                    <l.Space mr={[0, spacing.sm]} width={['100%', 'auto']}>
                      <t.HelpText mb={spacing.t}>{subCategoryLabel}</t.HelpText>
                      <SelectInput
                        onChange={this.handleFilterChange('subCategoryId')}
                        value={subCategoryId}
                        width="100%">
                        <option value="all">All</option>
                        {category.subCategories.map(
                          (subCat: FilterCategory) => {
                            return (
                              <option key={subCat.id} value={subCat.id}>
                                {subCat.name}
                              </option>
                            );
                          },
                        )}
                      </SelectInput>
                    </l.Space>
                  )}
                  {!R.equals(this.state, initialFiltersState) && (
                    <ClearButton
                      height={spacing.ml}
                      mt={[`-${spacing.s}`, spacing.m, spacing.m]}
                      onClick={this.clearFilters}
                      src={CloseImg}
                    />
                  )}
                </l.Flex>
                {legend}
              </l.Flex>
              {lowerLegend}
            </FilterBarWrapper>
          </div>
        </Sticky>
        {children({
          categoryId,
          searchValue,
          subCategoryId,
        })}
      </div>
    );
  }
}

export default withRouter(FilterBar);

import { SettingFramItem, SelectCategories } from 'components/atoms';
import React from 'react';
import PropTypes from 'prop-types';

function Category({ handleBasicInfo, title }) {
  return (
    <SettingFramItem title="카테고리*">
      <SelectCategories handleBasicInfo={handleBasicInfo} title={title} />
    </SettingFramItem>
  );
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  handleBasicInfo: PropTypes.func.isRequired,
};

export default Category;

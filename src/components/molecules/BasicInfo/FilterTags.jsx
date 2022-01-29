import React, { useEffect, useState } from 'react';
import { FilterTag } from 'components/atoms';
import PropTypes from 'prop-types';

function FilterTags({ handleBasicInfo, title }) {
  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {
    handleBasicInfo(title, selectedTag);
  }, [selectedTag]);
  return <FilterTag selectedTag={selectedTag} setSelectedTag={setSelectedTag} />;
}

FilterTags.propTypes = {
  title: PropTypes.string.isRequired,
  handleBasicInfo: PropTypes.func.isRequired,
};

export default FilterTags;

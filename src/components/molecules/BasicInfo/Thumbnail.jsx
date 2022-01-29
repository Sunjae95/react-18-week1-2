import { ImageUpload, SettingFramItem } from 'components/atoms';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Thumbnail({ handleBasicInfo, title }) {
  const [thumbnail, setThumbnail] = useState([]);

  useEffect(() => {
    handleBasicInfo(title, thumbnail);
  }, [thumbnail]);

  return (
    <SettingFramItem title="상품 썸네일">
      <ImageUpload imgFiles={thumbnail} setImgFiles={setThumbnail} single="true" />
    </SettingFramItem>
  );
}

Thumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  handleBasicInfo: PropTypes.func.isRequired,
};

export default Thumbnail;

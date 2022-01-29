import { SettingFramItem } from 'components/atoms';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { totalStockState } from 'utils/globalState';
import PropTypes from 'prop-types';

function TotalStock({ handleBasicInfo, title }) {
  const totalStock = useRecoilValue(totalStockState);
  const setTotalStack = useSetRecoilState(totalStockState);
  useEffect(() => {
    setTotalStack(1);
  }, []);

  useEffect(() => {
    handleBasicInfo(title, totalStock);
  }, [totalStock]);
  return (
    <SettingFramItem title="상품 총 재고*">
      <StockContainer>
        <p>
          {totalStock}
          개
        </p>
      </StockContainer>
    </SettingFramItem>
  );
}

TotalStock.propTypes = {
  title: PropTypes.string.isRequired,
  handleBasicInfo: PropTypes.func.isRequired,
};

const StockContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.padding.small};
  height: 3rem;
`;

export default TotalStock;

/* eslint-disable no-console */
import { SettingFramItem } from 'components/atoms';
import Calendar from 'components/atoms/Calendar';
import RadioButton from 'components/atoms/RadioButton';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Term({ name, select, setSelect }) {
  return (
    <SettingFramItem title={`상품 ${name} 기한`}>
      <Content>
        <RadioButton
          name={name}
          text="제한 없음"
          select={select}
          setSelect={setSelect}
        />
        <RadioButton
          name={name}
          text={`미${name}`}
          select={select}
          setSelect={setSelect}
        />
        <RadioButton
          name={name}
          text={`${name} 기간 설정`}
          select={select}
          setSelect={setSelect}
        />
        <CalendarWrap>
          <Calendar time className="calendar" />
          <span>~</span>
          <Calendar time className="calendar" />
        </CalendarWrap>
      </Content>
    </SettingFramItem>
  );
}

export default Term;

Term.propTypes = {
  name: PropTypes.string.isRequired,
  select: PropTypes.string.isRequired,
  setSelect: PropTypes.func.isRequired,
};

const Content = styled.div`
  padding: 20px;
`;

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;

  span {
    font-size: 20px;
    margin: 0 15px;
  }
`;

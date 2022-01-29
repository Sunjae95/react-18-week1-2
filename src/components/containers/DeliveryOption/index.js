/* eslint-disable no-alert */
import { SettingFrame } from 'components/atoms';
import Calendar from 'components/atoms/Calendar';
import SettingFramItem from 'components/atoms/SettingFrameItem';
import ToggleBtn from 'components/atoms/ToggleBtn';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isSavedState, { registerFormState } from 'utils/globalState';

function DeliveryOption() {
  const [deliveryStatus, setDeliveryStatus] = useState({
    customDelivery: false,
    visitReceived: false,
    reservatedDelivery: true,
  });

  const [orderTime, setOrderTime] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    earlyDeliveryDate: new Date(),
    normalDeliveryDate: new Date(),
  });

  const isSaved = useRecoilValue(isSavedState);
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const saveData = (key, value) => {
    setRegisterForm({
      ...registerForm,
      [key]: value,
    });
  };

  useEffect(() => {
    saveData('deliveryStatus', { deliveryStatus, orderTime });
  }, [isSaved]);

  function onCustomCheckedChange() {
    setDeliveryStatus({
      ...deliveryStatus,
      customDelivery: !deliveryStatus.customDelivery,
    });
  }

  function onVisitCheckedChange() {
    setDeliveryStatus({
      ...deliveryStatus,
      visitReceived: !deliveryStatus.visitReceived,
    });
  }

  function onReserveCheckedChange() {
    if (!deliveryStatus.reservatedDelivery) {
      setDeliveryStatus({
        ...deliveryStatus,
        customDelivery: false,
        visitReceived: false,
      });
    }
    setDeliveryStatus({
      ...deliveryStatus,
      reservatedDelivery: !deliveryStatus.reservatedDelivery,
    });
  }

  function onCalendarFromChange(dateValue) {
    setOrderTime({ ...orderTime, fromDate: dateValue });
  }

  function onCalendarToChange(dateValue) {
    setOrderTime({ ...orderTime, toDate: dateValue });
  }

  function onCalendarEarlyChange(dateValue) {
    if (dateValue <= orderTime.toDate) {
      alert('주문 시간 이후로 출고일을 지정해 주세요.');
    } else {
      setOrderTime({ ...orderTime, earlyDeliveryDate: dateValue });
    }
  }

  function onCalendarNormalChange(dateValue) {
    if (dateValue <= orderTime.toDate) {
      alert('주문 시간 이후로 출고일을 지정해 주세요.');
    } else {
      setOrderTime({ ...orderTime, normalDeliveryDate: dateValue });
    }
  }

  return (
    <SettingFrame title="상품 배송 설정">
      <SettingFramItem title="사용자 배송일 출발일 지정">
        <ToggleBtn
          isToggle={deliveryStatus.customDelivery}
          disabled={deliveryStatus.reservatedDelivery}
          onChange={() => onCustomCheckedChange()}
        />
      </SettingFramItem>
      <SettingFramItem title="방문 수령">
        <ToggleBtn
          isToggle={deliveryStatus.visitReceived}
          disabled={deliveryStatus.reservatedDelivery}
          onChange={() => onVisitCheckedChange()}
        />
      </SettingFramItem>
      <SettingFramItem title="선주문 예약 배송">
        <div>
          <ToggleBtn
            isToggle={deliveryStatus.reservatedDelivery}
            disabled={
              deliveryStatus.customDelivery || deliveryStatus.visitReceived
            }
            onChange={() => onReserveCheckedChange()}
          />
        </div>
        <div>
          <span>주문시간</span>
          <Calendar
            time
            state={orderTime.fromDate}
            onChange={(e) => onCalendarFromChange(e)}
          />
          <span>~</span>
          <Calendar
            time
            state={orderTime.toDate}
            onChange={(e) => onCalendarToChange(e)}
          />
        </div>
        <div>
          <span>새벽 배송</span>
          <Calendar
            state={orderTime.earlyDeliveryDate}
            onChange={(e) => onCalendarEarlyChange(e)}
          />
          <span>일반 배송</span>
          <Calendar
            state={orderTime.normalDeliveryDate}
            onChange={(e) => onCalendarNormalChange(e)}
          />
        </div>
      </SettingFramItem>
    </SettingFrame>
  );
}

export default DeliveryOption;

/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import isSavedState, { productOption, registerFormState } from 'utils/globalState';

const OPT_SET_ADD_BTN = 'optSetAddBtn';
const OPT_ADD_BTN = 'optAddBtn';
const ADDITION_OPT_ADD_BTN = 'additionOptAddBtn';
const OPT_SET_DEL_BTN = 'optSetDelBtn';
const OPT_DEL_BTN = 'optDelBtn';
const ADDITION_OPT_DEL_BTN = 'additionOptDelBtn';
const IMAGE = 'image';

const newOptSet = () => ({
  id: Date.now() - 1,
  image: '',
  options: [{
    id: Date.now(),
    optName: '',
    productPrice: 0,
    productSale: 0,
    productStock: 0,
    isTax: false,
    optAdditions: [],
  }],
});
const newOption = () => ({
  id: Date.now(),
  optName: '',
  productPrice: 0,
  productSale: 0,
  productStock: 0,
  isTax: false,
  optAdditions: [],
});
const newOptAddition = () => ({
  id: Date.now(),
  additionOptName: '',
  additionOptPrice: '',
});

const useProductState = () => {
  const [optSets, setOptSets] = useRecoilState(productOption);

  const handleAdd = ({ name, id }) => {
    switch (name) {
      case OPT_SET_ADD_BTN: {
        const nextState = [...optSets, newOptSet()];
        setOptSets(nextState);
        break;
      }
      case OPT_ADD_BTN: {
        const nextState = optSets.map((optSet) => {
          const next = { ...optSet };
          if (optSet.id === id) {
            next.options = [...optSet.options, newOption()];
          }
          return next;
        });

        setOptSets(nextState);
        break;
      }
      case ADDITION_OPT_ADD_BTN: {
        const nextState = optSets.map((optSet) => {
          const nextOS = { ...optSet };
          nextOS.options = nextOS.options.map((option) => {
            const nextOP = { ...option };
            if (nextOP.id === id) {
              nextOP.optAdditions = [...nextOP.optAdditions, newOptAddition()];
            }
            return nextOP;
          });

          return nextOS;
        });

        setOptSets(nextState);
        break;
      }
      default:
    }
  };

  const handleDelete = ({ name, id }) => {
    switch (name) {
      case OPT_SET_DEL_BTN: {
        const nextState = optSets.filter((optSet) => optSet.id !== id);

        setOptSets(nextState);
        break;
      }
      case OPT_DEL_BTN: {
        const nextState = optSets.map((optSet) => {
          const nextOS = { ...optSet };
          nextOS.options = nextOS.options.filter((option) => option.id !== id);

          return nextOS;
        });

        setOptSets(nextState);
        break;
      }
      case ADDITION_OPT_DEL_BTN: {
        const nextState = optSets.map((optSet) => {
          const nextOS = { ...optSet };
          nextOS.options = nextOS.options.map(
            (option) => {
              const nextOP = { ...option };
              nextOP.optAdditions = nextOP.optAdditions.filter(
                (optAddition) => optAddition.id !== id,
              );

              return nextOP;
            },
          );

          return nextOS;
        });

        setOptSets(nextState);
        break;
      }
      default:
    }
  };

  const handleChange = (e) => {
    const { name: inputName, value } = e.target;
    const [name, strId] = inputName.split('_');
    const id = Number(strId);

    switch (name) {
      case IMAGE: {
        const nextState = optSets.map((optSet) => {
          const nextOS = { ...optSets };
          if (nextOS.id === id) {
            nextOS.image = value;
          }

          return nextOS;
        });

        setOptSets(nextState);
        break;
      }
      default: {
        const nextState = optSets.map((optSet) => {
          const nextOS = { ...optSet };
          nextOS.options = nextOS.options.map(
            (option) => {
              const nextOP = { ...option };

              if (nextOP.id === id) {
                nextOP[name] = value;

                return nextOP;
              }

              nextOP.optAdditions = nextOP.optAdditions.map((optAddition) => {
                const nextAOP = { ...optAddition };
                if (nextAOP.id === id) {
                  nextAOP[name] = value;
                }
                return nextAOP;
              });

              return nextOP;
            },
          );

          return nextOS;
        });

        setOptSets(nextState);
      }
    }
  };

  const Clickhandler = (e) => {
    const { name: elName, tagName } = e.target;

    if (tagName !== 'button' && tagName !== 'BUTTON') return;

    const [name, strId] = elName.split('_');
    const id = Number(strId);

    handleAdd({ name, id });
    handleDelete({ name, id });
  };

  return { optSets, Clickhandler, handleChange };
};

export default useProductState;

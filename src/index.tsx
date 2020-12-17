import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
  ChangeEvent
} from 'react';

export type SetSelected = Dispatch<SetStateAction<number[]>>;
export type ItemsListContainerRef<T> = RefObject<T>;
export type OnChange = ChangeEvent<HTMLInputElement>;

export interface UseSelection<T> {
  itemsListContainerRef: ItemsListContainerRef<T>;
  selectedItems: number[];
  setSelectedItems: SetSelected;
  handleToggleSelect: (event: OnChange, index: number) => void;
  handleToggleSelectAll: (event: OnChange, itemsCount: number) => void;
}

const methods = {
  selectItem(
    index: number,
    selectedItems: number[],
    setSelected: SetSelected
  ): void {
    const nextState = [...selectedItems, index];

    setSelected(nextState);
  },

  unSelectItems(
    listOfIndex: number[],
    selectedItems: number[],
    setSelected: SetSelected
  ): void {
    setSelected(selectedItems.filter((index) => !listOfIndex.includes(index)));
  },

  toggleSelect(
    event: OnChange,
    index: number,
    selectedItems: number[],
    setSelected: SetSelected
  ): void {
    event.target.checked
      ? methods.selectItem(index, selectedItems, setSelected)
      : methods.unSelectItems([index], selectedItems, setSelected);
  },

  toggleSelectAll<T extends HTMLElement>(
    event: OnChange,
    itemsListContainerRef: ItemsListContainerRef<T>,
    itemsCount: number,
    selectedItems: number[],
    setSelected: SetSelected
  ): void {
    const listOfIndex = new Array(itemsCount).fill(null).map((_x, i) => i);

    event.target.checked
      ? setSelected(listOfIndex)
      : methods.unSelectItems(listOfIndex, selectedItems, setSelected);

    if (itemsListContainerRef.current) {
      const checkboxes: NodeListOf<Element> = itemsListContainerRef.current.querySelectorAll(
        'input[type=checkbox]'
      );

      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = event.target.checked;
      });
    }
  }
};

export default function useSelection<T extends HTMLElement>(): UseSelection<T> {
  const itemsListContainerRef = useRef<T>(null);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  return {
    itemsListContainerRef,

    selectedItems,
    setSelectedItems,

    handleToggleSelect(event, index): void {
      methods.toggleSelect(event, index, selectedItems, setSelectedItems);
    },

    handleToggleSelectAll(event, itemsCount): void {
      methods.toggleSelectAll(
        event,
        itemsListContainerRef,
        itemsCount,
        selectedItems,
        setSelectedItems
      );
    }
  };
}

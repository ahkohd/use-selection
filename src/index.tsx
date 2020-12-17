import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
  ChangeEvent
} from 'react';

export type SetSelected = Dispatch<SetStateAction<number[]>>;
export type ItemsListContainerRef = RefObject<HTMLElement>;
export type OnChange = ChangeEvent<HTMLInputElement>;

export interface UseSelection {
  itemsListContainerRef: ItemsListContainerRef;
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

  toggleSelectAll(
    event: OnChange,
    itemsListContainerRef: ItemsListContainerRef,
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

const useSelection = (): UseSelection => {
  const itemsListContainerRef = useRef<HTMLElement>(null);

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
};

export default useSelection;

import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('should display five checkboxes', () => {
    render(<App />);
    expect(screen.getAllByLabelText('Item', { exact: false }).length).toBe(4);
    expect(
      screen.getAllByLabelText('Select All', { exact: false }).length
    ).toBe(1);
  });

  it('should display checkboxes unchecked', () => {
    render(<App />);
    const { checkbox1, checkbox2, checkbox3, checkbox4, checkboxSelectAll } =
      getCheckboxes();
    expect(checkbox1.checked).toBeFalsy();
    expect(checkbox2.checked).toBeFalsy();
    expect(checkbox3.checked).toBeFalsy();
    expect(checkbox4.checked).toBeFalsy();
    expect(checkboxSelectAll.checked).toBeFalsy();
  });

  describe('when clicking a numbered checkbox', () => {
    it('should let unchanged other checkboxes', () => {
      render(<App />);

      const { checkbox1, checkbox2, checkbox3, checkbox4, checkboxSelectAll } =
        getCheckboxes();

      fireEvent.click(checkbox2);

      expect(checkbox1.checked).toBeFalsy();
      expect(checkbox2.checked).toBeTruthy();
      expect(checkbox3.checked).toBeFalsy();
      expect(checkbox4.checked).toBeFalsy();
      expect(checkboxSelectAll.checked).toBeFalsy();

      fireEvent.click(checkbox4);

      expect(checkbox1.checked).toBeFalsy();
      expect(checkbox2.checked).toBeTruthy();
      expect(checkbox3.checked).toBeFalsy();
      expect(checkbox4.checked).toBeTruthy();
      expect(checkboxSelectAll.checked).toBeFalsy();
    });

    it('should check the "select-all" checkbox if all checkboxes are checked', () => {
      render(<App />);

      const { checkbox1, checkbox2, checkbox3, checkbox4, checkboxSelectAll } =
        getCheckboxes();

      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);
      fireEvent.click(checkbox3);
      fireEvent.click(checkbox4);

      expect(checkbox1.checked).toBeTruthy();
      expect(checkbox2.checked).toBeTruthy();
      expect(checkbox3.checked).toBeTruthy();
      expect(checkbox4.checked).toBeTruthy();
      expect(checkboxSelectAll.checked).toBeTruthy();
    });

    it('should uncheck the "select-all" checkbox if all checkboxes were checked', () => {
      render(<App />);

      const { checkbox1, checkbox2, checkbox3, checkbox4, checkboxSelectAll } =
        getCheckboxes();

      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);
      fireEvent.click(checkbox3);
      fireEvent.click(checkbox4);

      expect(checkboxSelectAll.checked).toBeTruthy();

      fireEvent.click(checkbox1);

      expect(checkbox1.checked).toBeFalsy();
      expect(checkbox2.checked).toBeTruthy();
      expect(checkbox3.checked).toBeTruthy();
      expect(checkbox4.checked).toBeTruthy();
      expect(checkboxSelectAll.checked).toBeFalsy();
    });
  });

  describe('when clicking the "select-all" checkbox', () => {
    it('should check all checkboxes if the "select-all" checkbox is previously unchecked', () => {
      render(<App />);
      const { checkbox1, checkbox2, checkbox3, checkbox4, checkboxSelectAll } =
        getCheckboxes();

      fireEvent.click(checkbox1);
      fireEvent.click(checkbox4);
      fireEvent.click(checkboxSelectAll);

      expect(checkbox1.checked).toBeTruthy();
      expect(checkbox2.checked).toBeTruthy();
      expect(checkbox3.checked).toBeTruthy();
      expect(checkbox4.checked).toBeTruthy();
      expect(checkboxSelectAll.checked).toBeTruthy();
    });

    it('should uncheck all checkboxes if the "select-all" checkbox is previously checked', () => {
      render(<App />);
      const { checkbox1, checkbox2, checkbox3, checkbox4, checkboxSelectAll } =
        getCheckboxes();

      fireEvent.click(checkboxSelectAll);

      expect(checkbox1.checked).toBeTruthy();
      expect(checkbox2.checked).toBeTruthy();
      expect(checkbox3.checked).toBeTruthy();
      expect(checkbox4.checked).toBeTruthy();
      expect(checkboxSelectAll.checked).toBeTruthy();

      fireEvent.click(checkboxSelectAll);

      expect(checkbox1.checked).toBeFalsy();
      expect(checkbox2.checked).toBeFalsy();
      expect(checkbox3.checked).toBeFalsy();
      expect(checkbox4.checked).toBeFalsy();
      expect(checkboxSelectAll.checked).toBeFalsy();
    });
  });

  function getCheckboxes(): {
    checkbox1: HTMLInputElement;
    checkbox2: HTMLInputElement;
    checkbox3: HTMLInputElement;
    checkbox4: HTMLInputElement;
    checkboxSelectAll: HTMLInputElement;
  } {
    const checkbox1: HTMLInputElement =
      screen.getByLabelText<HTMLInputElement>('Item 1');
    const checkbox2: HTMLInputElement =
      screen.getByLabelText<HTMLInputElement>('Item 2');
    const checkbox3: HTMLInputElement =
      screen.getByLabelText<HTMLInputElement>('Item 3');
    const checkbox4: HTMLInputElement =
      screen.getByLabelText<HTMLInputElement>('Item 4');
    const checkboxSelectAll: HTMLInputElement =
      screen.getByLabelText<HTMLInputElement>('Select all');

    return {
      checkbox1,
      checkbox2,
      checkbox3,
      checkbox4,
      checkboxSelectAll
    };
  }
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm'; // Import the SearchForm component

describe('SearchForm Component Tests', () => {
  it('renders an input with the value equal to the initial value passed in props', () => {
    const initialSearchQuery = 'Initial Value';
    const { getByDisplayValue } = render(<SearchForm initialSearchQuery={initialSearchQuery} />);
    
    const inputElement = getByDisplayValue(initialSearchQuery);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls the onChange prop with the proper value after clicking the Submit button', () => {
    const mockOnChange = jest.fn();
    const { getByText, getByPlaceholderText } = render(<SearchForm onSearch={mockOnChange} />);
    
    const inputValue = 'Test Query';
    const inputElement = getByPlaceholderText('Search');
    const submitButton = getByText('Search');

    fireEvent.change(inputElement, { target: { value: inputValue } });
    fireEvent.click(submitButton);
    
    expect(mockOnChange).toHaveBeenCalledWith(inputValue);
  });

  it('calls the onChange prop with the proper value after pressing the Enter key', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchForm onSearch={mockOnChange} />);
    
    const inputValue = 'Test Query';
    const inputElement = getByPlaceholderText('Search');
    
    fireEvent.change(inputElement, { target: { value: inputValue } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockOnChange).toHaveBeenCalledWith(inputValue);
  });
});

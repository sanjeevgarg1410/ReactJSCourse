import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter'; // Import the Counter component

describe('Counter Component Tests', () => {
  it('renders initial value provided in props', () => {
    const initialValue = 10; // Set the initial value
    const { getByText } = render(<Counter initialValue={initialValue} />);

    const countElement = getByText(initialValue.toString());
    expect(countElement).toBeInTheDocument();
  });

  it('increments the displayed value when clicking the "increment" button', () => {
    const { getByText, getByRole } = render(<Counter initialValue={0} />);

    const incrementButton = getByText('+');
    const countElement = getByText('0');

    fireEvent.click(incrementButton);

    expect(countElement).toHaveTextContent('1');
  });

  it('decrements the displayed value when clicking the "decrement" button', () => {
    const { getByText, getByRole } = render(<Counter initialValue={10} />);

    const decrementButton = getByText('-');
    const countElement = getByText('10');

    fireEvent.click(decrementButton);

    expect(countElement).toHaveTextContent('9');
  });
});

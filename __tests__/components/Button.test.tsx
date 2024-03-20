import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button'; 

describe('Button', () => {
  // Button is rendered with label and onClick function
  it('should render button with label and onClick function', () => {
    // Arrange
    const label = "Test Button";
    const onClick = jest.fn();

    // Act
    render(<Button label={label} onClick={onClick} />);

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(label)).not.toHaveAttribute("disabled"); //check if disabled
    fireEvent.click(screen.getByText(label));
    expect(onClick).toHaveBeenCalled();
  });

  // onClick function is not provided
  it('should render button without onClick function', () => {
    // Arrange
    const label = "Test Button";

    // Act
    render(<Button label={label} />);

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(label)).not.toHaveAttribute("disabled"); // check if disabled
    fireEvent.click(screen.getByText(label)); // Should not throw error
  });
});

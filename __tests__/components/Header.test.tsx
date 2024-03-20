import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'
 
describe('Header', () => {

  it('renders a heading', () => {
    render(<h1 />);
 
    const heading = screen.getByRole('heading')
 
    expect(heading).toBeInTheDocument()
  })

})
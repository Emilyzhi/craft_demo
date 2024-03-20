import { render, screen } from '@testing-library/react'; 
import Layout from '../../components/Layout'; 
import { Provider as SessionProvider, useSession } from 'next-auth/react';


jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(), // 
}));

describe('Layout', () => {
  // Renders a div with class 'h-screen bg-white'
  it('should render a div with class \'h-screen bg-white\' when called', () => {
    console.log('aaa', useSession)
    useSession.mockReturnValue({ data: {
        user: { name: 'abc', email: 'abc@abc.com', image: 'cat.jpeg', userId: '2' },
        expires: '2024-03-20T19:11:01.582Z'
      }, status: 'loading' });


    render(<Layout children={null} />); // 


    const layoutDiv = screen.getByTestId('main-layout'); 
    expect(layoutDiv).toBeInTheDocument(); 
    expect(layoutDiv).toHaveClass('bg-white'); 
  });

});

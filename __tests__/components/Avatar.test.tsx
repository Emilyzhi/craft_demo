import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Avatar from '../../components/Avatar'; 
import useUser from '../../hooks/useUser'; 
import { useRouter } from 'next/router';

// mock next/router
jest.mock('next/router',()=>({useRouter:jest.fn()}));
const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

jest.mock('../../hooks/useUser', ()=>jest.fn());

describe('Avatar', () => {


  afterEach(() => {
    jest.clearAllMocks();
  });

  // Renders an avatar image with a default placeholder when user profile image is not available
  it('should render default placeholder when user profile image is not available', () => {

    useUser.mockReturnValue({ data: undefined });


    render(<Avatar userId="123" isLarge={false} hasBorder={false} />);


    const image = screen.getByRole('img');
    expect(image.src).toMatch("http://localhost/_next/image?");
  });
});

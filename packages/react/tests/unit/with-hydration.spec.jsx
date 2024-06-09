import { render } from '@testing-library/react'
import { getHydrationData } from '@terra/islands'
import { withHydration } from '../../dist/with-hydration.js'

// mock the getHydrationData function
jest.mock('@terra/islands', () => ({
  getHydrationData: jest.fn(),
}))

describe('withHydration', () => {
  const MockComponent = ({ message }) => <div>{message}</div>

  beforeEach(() => {
    (getHydrationData).mockReset()
  })

  it('should render the component statically if no hydration strategy', () => {
    (getHydrationData).mockReturnValue({ strategy: false, props: { message: 'Hello' } })

    const WrappedComponent = withHydration(MockComponent)
    const { container } = render(<WrappedComponent message="Hello" />)

    expect(container.querySelector('div')?.textContent).toBe('Hello')
    expect(container.querySelector('terra-island')).toBeNull()
  })

  it('should render the component inside a terra-island with script if hydration strategy is present', () => {
    (getHydrationData).mockReturnValue({ strategy: true, props: { message: 'Hello' } })

    const WrappedComponent = withHydration(MockComponent)
    const { container } = render(<WrappedComponent message="Hello" />)

    expect(container.querySelector('div')?.textContent).toBe('Hello')
    expect(container.querySelector('terra-island')).not.toBeNull()
    expect(container.querySelector('script')).not.toBeNull()
  })
})

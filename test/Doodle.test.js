import { shallow, mount } from 'vue-test-utils'
import Doodle from '@/Doodle'
import { createRenderer } from 'vue-server-renderer'

describe('Doodle', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(Doodle, {
      propsData: {
        msg
      }
    })
    expect(wrapper.html()).toBe('<div><p>new message</p></div>')
  })
  it('matches snapshot', () => {
    const wrapper = shallow(Doodle, {})
    const renderer = createRenderer()
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})

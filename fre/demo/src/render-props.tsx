import { h, render } from '../../src'
const HelloBox = () => (
  <ul>
    <li class="foo2">1</li>
    <li className="bar2">2</li>
    <li data-something="baz2" tabIndex={99}>3</li>
  </ul>
)

render(<HelloBox />, document.getElementById('root'))

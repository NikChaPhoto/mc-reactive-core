import PageComponent from './components/PageComponent.js';
import PerformanceMonitor from './dev/PerformanceMonitor.js';
import P from '../assets/core/elements/typography/P.js';
import H1 from '../assets/core/elements/typography/H1.js';
import HGroup from '../assets/core/elements/layout/HGroup.js';
const appDiv = document.getElementById('app');

const PNode = new P();
PNode.textContent = 'This is a paragraph element created using the P class.';
const H1Node = new H1();
H1Node.textContent = 'This is an H1 element created using the H1 class.';
const HGroupNode = new HGroup();
HGroupNode.appendChild(H1Node);
HGroupNode.appendChild(PNode);
appDiv.appendChild(HGroupNode);

const performanceMonitor = new PerformanceMonitor()
performanceMonitor.mount();

const page = new PageComponent();
page.mount(appDiv);

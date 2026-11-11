import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const tabs=readFileSync(new URL('../js/lebesgueUI.js',import.meta.url),'utf8');
test('conclusions tab and section are present',()=>{assert.match(html,/id="tab-conclusions"/);assert.match(html,/id="conclusions-lab" hidden/);});
test('conclusions navigation is wired',()=>{assert.match(tabs,/show\('conclusions'\)/);assert.match(tabs,/\['riemann','lebesgue','cdf','analysis','conclusions'\]/);});
test('conclusions describe numerical limitations',()=>{assert.match(html,/sampled approximation/);assert.match(html,/Floating-point stability/);assert.match(html,/hardware-dependent/);});

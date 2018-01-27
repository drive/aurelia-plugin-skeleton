import { FrameworkConfiguration } from 'aurelia-framework';
import { configure } from '../../src/index';

describe('plugin configure routine should', () => {
    it('export configure function', () => {
        expect(typeof configure).toBe('function');
    });
});

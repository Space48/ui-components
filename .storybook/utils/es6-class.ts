import addons from '@storybook/addons';
import CoreEvents from '@storybook/core-events';
import {RenderFunction} from '@storybook/html';

export const es6Class = (selector: string, Constructor: any) => (
  story: RenderFunction,
) => {
  setTimeout(() =>
    addons.getChannel().emit(CoreEvents.REGISTER_SUBSCRIPTION, () => {
      const el = document.querySelector(selector) as HTMLElement;

      if (!el) {
        throw new Error(`es6Class: element matching ${selector} was not found`);
      }

      if (!Constructor.prototype.destroy) {
        throw new Error(
          `es6Class: destroy method is required for ${Constructor.name}`,
        );
      }

      const instance = new Constructor(el);

      return function unsubscribe(): void {
        instance.destroy();
      };
    }),
  );
  return `${story()}`;
};

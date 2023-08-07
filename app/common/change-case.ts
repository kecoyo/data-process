import _ from 'lodash';

/**
 * Converts `string` to [camel case].
 *
 * camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
export function camelCase(string?: string): string {
  return _.camelCase(string);
}

/**
 * Converts `string` to [pascal case].
 *
 * pascalCase('Foo Bar');
 * // => 'FooBar'
 *
 * pascalCase('--foo-bar--');
 * // => 'FooBar'
 *
 * pascalCase('__FOO_BAR__');
 * // => 'FooBar'
 */
export function pascalCase(string?: string): string {
  return _.upperFirst(_.camelCase(string));
}

/**
 * Converts `string` to [constant case].
 *
 * constantCase('Foo Bar');
 * // => 'FOO_BAR'
 *
 * constantCase('--foo-bar--');
 * // => 'FOO_BAR'
 *
 * constantCase('__FOO_BAR__');
 * // => 'FOO_BAR'
 */
export function constantCase(string?: string): string {
  return upperCase(string).replace(/ /g, '_');
}

/**
 * Converts `string` to [dot case].
 *
 * dotCase('Foo Bar');
 * // => 'foo.bar'
 *
 * dotCase('--foo-bar--');
 * // => 'foo.bar'
 *
 * dotCase('__FOO_BAR__');
 * // => 'foo.bar'
 */
export function dotCase(string?: string): string {
  return lowerCase(string).replace(/ /g, '.');
}

/**
 * Converts `string` to [kebab case].
 *
 * kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
export function kebabCase(value: any): string {
  return _.kebabCase(value);
}

/**
 * Converts `string` to [snake case].
 *
 * snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 */
export function snakeCase(string?: string): string {
  return _.snakeCase(string);
}

/**
 * Converts `string` to [path case].
 *
 * pathCase('Foo Bar');
 * // => 'foo/bar'
 *
 * pathCase('--foo-bar--');
 * // => 'foo/bar'
 *
 * pathCase('__FOO_BAR__');
 * // => 'foo/bar'
 */
export function pathCase(string?: string): string {
  return lowerCase(string).replace(/ /g, '/');
}

/**
 * Converts `string` to [start case].
 *
 * startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * startCase('fooBar');
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
export function startCase(string?: string): string {
  return _.startCase(string);
}

/**
 * Converts `string` to [title case].
 *
 * titleCase('Foo Bar');
 * // => 'Foo Bar'
 *
 * titleCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * titleCase('__FOO_BAR__');
 * // => 'Foo Bar'
 */
export function titleCase(string?: string): string {
  return lowerCase(string)
    .split(' ')
    .map((word) => _.capitalize(word))
    .join(' ');
}

/**
 * Converts `string` to [sentence case].
 *
 * sentenceCase('Foo Bar');
 * // => 'Foo bar'
 *
 * sentenceCase('--foo-bar--');
 * // => 'Foo bar'
 *
 * sentenceCase('__FOO_BAR__');
 * // => 'Foo bar'
 */
export function sentenceCase(string?: string): string {
  return upperFirst(lowerCase(string));
}

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * upperCase('--foo-bar');
 * // => 'FOO BAR'
 *
 * upperCase('fooBar');
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__');
 * // => 'FOO BAR'
 */
export function upperCase(string?: string): string {
  return _.upperCase(string);
}

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * lowerCase('--Foo-Bar--');
 * // => 'foo bar'
 *
 * lowerCase('fooBar');
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__');
 * // => 'foo bar'
 */
export function lowerCase(string?: string): string {
  return _.lowerCase(string);
}

/**
 * Converts the first character of `string` to upper case.
 *
 * upperFirst('fred');
 * // => 'Fred'
 *
 * upperFirst('FRED');
 * // => 'FRED'
 */
export function upperFirst(string?: string): string {
  return _.upperFirst(string);
}

/**
 * Converts the first character of `string` to lower case.
 *
 * lowerFirst('Fred');
 * // => 'fred'
 *
 * lowerFirst('FRED');
 * // => 'fRED'
 */
export function lowerFirst(string?: string): string {
  return _.lowerFirst(string);
}

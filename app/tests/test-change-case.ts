import { camelCase, dotCase, kebabCase, lowerCase, pascalCase, pathCase, snakeCase, startCase, titleCase, upperCase } from '@/common/change-case';

const name = 'tsconfig-paths/register';

console.log('camelCase:', camelCase(name));
console.log('pascalCase:', pascalCase(name));
console.log('kebabCase:', kebabCase(name));
console.log('snakeCase:', snakeCase(name));
console.log('dotCase:', dotCase(name));
console.log('pathCase:', pathCase(name));
console.log('titleCase:', titleCase(name));
console.log('startCase:', startCase(name));
console.log('upperCase:', upperCase(name));
console.log('lowerCase:', lowerCase(name));

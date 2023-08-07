import paralleljs from 'paralleljs';

const p = new paralleljs([1, 2, 3, 4, 5]);
console.log('🚀 ~ file: test-parallel.ts:4 ~ p:', p.data);

// Spawn a remote job (we'll see more on how to use then later)
p.spawn((data) => {
  data = data.reverse();
  return data;
}).then((data) => {
  console.log(data); // logs sdrawrof
});

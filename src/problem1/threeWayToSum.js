// Implementation A: Using a simple loop
const sum_to_n_a = function (n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

// Implementation B: Using the mathematical formula for the sum of first n natural numbers
const sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2
}

// Implementation C: Using recursion
const sum_to_n_c = function (n) {
  if (n === 1) {
    return 1
  }
  return n + sum_to_n_c(n - 1)
}

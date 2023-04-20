const dummy = (list) => {
  return 1;
};

const totalLikes = (list) => {
  let sum = list.reduce((sum, blog) => sum + blog.likes, 0);
  return sum;
};

const favouriteBlog = (list) => {
  let likesArray = list.map((x) => x.likes);
  let max = Math.max(...likesArray);
  let index = likesArray.indexOf(max);
  return index >= 0 ? list[index] : 0;
};

const mostBlogs = (list) => {
  let authors = list.map((x) => x.author);
  let max = 0;
  let current, index;
  authors.forEach((x, i) => {
    current = authors.filter((j) => j === x).length;
    if (max < current) {
      max = current;
      index = i;
    }
  });
  return max == 0 ? 0 : { author: list[index].author, blogs: max };
};

const mostLikes = (list) => {
  let authors = [...new Set(list.map((x) => x.author))];
  let max = 0;
  let current, best;
  authors.forEach((x) => {
    current = totalLikes(list.filter((j) => j.author === x));
    if (max < current) {
      max = current;
      best = x;
    }
  });
  return max == 0 ? 0 : { author: best, likes: max };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };

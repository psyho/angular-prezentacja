var Post = $resource('/posts/:id', {id: '@id'}, {
  update: {method: 'PUT'},
  destroy: {method: 'DELETE'}
});

var post = Post.get({id: '123'});
// post is {} until XHR returns
// then it gets filled with data
post.title = "hello";
post.$update();

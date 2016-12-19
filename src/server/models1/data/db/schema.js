module.exports = [
  {
    name: 'users',
    comment: 'User table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'slug', type: 'string', length: 200, nullable: false, unique: true },
      { name: 'username', type: 'string', length: 60, nullable: false, unique: true },
      { name: 'password', type: 'string', length: 100, nullable: false },
      { name: 'nickname', type: 'string', length: 60, nullable: false },
      { name: 'email', type: 'string', length: 100, nullable: false, unique: true },
      { name: 'mobile', type: 'string', length: 20, nullable: false, unique: true },
      { name: 'status', type: 'string', length: 20, nullable: false, default: 'unactivated', comment: 'email-unactivated / mobile-unactivated / activated / forbidden' },
      { name: 'role', type: 'string', length: 20, nullable: false, default: 'subscriber', comment: 'administrator / editor / author / contributor / subscriber' },
      { name: 'created', type: 'dateTime', nullable: false },
      { name: 'modified', type: 'dateTime', nullable: false }
    ]
  },
  {
    name: 'user_meta',
    comment: 'User meta table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'key', type: 'string', length: 60, nullable: false },
      { name: 'value', type: 'text', length: 'medium', nullable: false },
      { name: 'user_id', type: 'integer', nullable: false, references: 'users.id' }
    ],
    unique: ['key', 'user_id']
  },
  {
    name: 'posts',
    comment: 'Post table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'slug', type: 'string', length: 200, nullable: false, unique: true },
      { name: 'title', type: 'string', length: 100, nullable: false },
      { name: 'excerpt', type: 'string', length: 2000 },
      { name: 'content', type: 'text', length: 'long' },
      { name: 'type', type: 'string', length: 20, nullable: false, default: 'post', comment: 'post / page / etc.' },
      { name: 'status', type: 'string', length: 20, nullable: false, default: 'draft', comment: 'draft / published / trash / etc.' },
      { name: 'comment_status', type: 'string', nullable: false, default: 'open', comment: 'open / ...roles / close' },
      { name: 'comment_count', type: 'integer', nullable: false, default: 0 },
      { name: 'view_count', type: 'integer', nullable: false, default: 0 },
      { name: 'created', type: 'dateTime', nullable: false },
      { name: 'modified', type: 'dateTime', nullable: false },
      { name: 'user_id', type: 'integer', nullable: false, references: 'users.id' },
      { name: 'parent_id', type: 'integer', nullable: false, references: 'posts.id' }
    ],
    index: ['type', 'status', 'user_id', 'parent_id']
  },
  {
    name: 'post_meta',
    comment: 'Post meta table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'key', type: 'string', length: 60, nullable: false },
      { name: 'value', type: 'text', length: 'medium', nullable: false },
      { name: 'post_id', type: 'integer', nullable: false, references: 'posts.id' }
    ],
    unique: ['key', 'post_id']
  },
  {
    name: 'comments',
    comment: 'Comment table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'author', type: 'string', length: 100, nullable: false },
      { name: 'author_email', type: 'string', length: 100, nullable: false },
      { name: 'author_url', type: 'string', length: 100, nullable: false },
      { name: 'author_ip', type: 'string', length: 20, nullable: false },
      { name: 'content', type: 'text', length: 'medium' },
      { name: 'status', type: 'string', length: 20, nullable: false, default: 'hold', comment: 'hold, approve, spam, or trash' },
      { name: 'user_agent', type: 'string', length: 200 },
      { name: 'created', type: 'dateTime', nullable: false },
      { name: 'modified', type: 'dateTime', nullable: false },
      { name: 'post_id', type: 'integer', nullable: false, references: 'posts.id' },
      { name: 'user_id', type: 'integer', nullable: false, references: 'users.id' },
      { name: 'parent_id', type: 'integer', nullable: false, references: 'comments.id' }
    ]
  },
  {
    name: 'comment_meta',
    comment: 'Comment meta table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'key', type: 'string', length: 60, nullable: false },
      { name: 'value', type: 'text', length: 'medium', nullable: false },
      { name: 'comment_id', type: 'integer', nullable: false, references: 'comments.id' }
    ],
    unique: ['key', 'comment_id']
  },
  {
    name: 'terms',
    comment: 'Term table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'slug', type: 'string', length: 60, nullable: false },
      { name: 'name', type: 'string', length: 200, nullable: false },
      { name: 'taxonomy', type: 'string', length: 20, nullable: false },
      { name: 'description', type: 'text', length: 'medium' },
      { name: 'count', type: 'integer', nullable: false, default: 0 },
      { name: 'created', type: 'dateTime', nullable: false },
      { name: 'modified', type: 'dateTime', nullable: false },
      { name: 'parent_id', type: 'integer', nullable: false, references: 'terms.id' }
    ],
    unique: ['slug', 'taxonomy']
  },
  {
    name: 'term_meta',
    comment: 'Term meta table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'key', type: 'string', length: 60, nullable: false },
      { name: 'value', type: 'text', length: 'medium', nullable: false },
      { name: 'term_id', type: 'integer', nullable: false, references: 'terms.id' }
    ],
    unique: ['key', 'term_id']
  },
  {
    name: 'term_relations',
    comment: 'Term relation table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'post_id', type: 'integer', nullable: false, references: 'posts.id' },
      { name: 'term_id', type: 'integer', nullable: false, references: 'terms.id' }
    ],
    unique: ['post_id', 'term_id']
  },
  {
    name: 'options',
    comment: 'Option table',
    columns: [
      { name: 'id', type: 'increments', nullable: false, primary: true },
      { name: 'key', type: 'string', length: 60, nullable: false, unique: true },
      { name: 'value', type: 'text', length: 'medium' }
    ]
  }
]

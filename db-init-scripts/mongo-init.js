db.createUser({
  user: 'gigzter',
  pwd: 'G1gZt3rDB',
  roles: [
    {
      role: 'readWrite',
      db: 'gigzter-local',
    },
  ],
});

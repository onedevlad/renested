export const entitiesPath = process.env.NODE_ENV === 'development'
  ? 'src/modules/**/*.entity.ts'
  : 'build/modules/**/*entity.js'

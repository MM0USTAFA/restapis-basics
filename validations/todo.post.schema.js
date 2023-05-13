import { log } from 'console'
export default {
  title: {
    isString: true,
    notEmpty: true,
    isLength: { options: { min: 5, max: 20 } },
    errorMessage:
      'title should be string with at leaset 5 characters, and at most 20'
  },
  content: {
    isString: true,
    notEmpty: true,
    isLength: { options: { max: 1500 } },
    errorMessage: "content should be text doesn't exceed 500 letters"
  },
  status: {
    // isIn: ['TODO', 'IN_PROGRESS', 'DONE'],
    custom: {
      options: (value) => ['TODO', 'IN_PROGRESS', 'DONE'].includes(value.toUpperCase())
    },
    optional: true,
    errorMessage: "status should be one of ['TODO', 'IN_PROGRESS', 'DONE']"
  },
  tags: {
    custom: {
      options: (value, { req }) => {
        if (!value instanceof Array) {
          throw new Error('tags should be an array')
        }

        for (const tag of value) {
          if (typeof tag === 'string' && tag.length > 10) {
            throw new Error('tag should be at most 10 letters')
          }
        }
        return true
      }
    }
  },
  user: {
    customSanitizer: {
      options: (value, { req }) => {
        if (req.body.user) {
          Reflect.deleteProperty(req.body, 'user')
        }
      }
    }
  }
}

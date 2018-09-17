import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as types from './constants/ActionTypes'
import * as actions from './actions'
import { commentCreateUrl } from 'api/cms'
import { commentMock } from './constants/Fixtures'

describe('actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  describe('Add comment', () => {
    describe('should create an action ', () => {
      it('to invalidate create comment', () => {
        const bool = true
        const expectedAction = {
          type: types.INVALIDATE_CREATE_COMMENT,
          didInvalidate: bool
        }

        expect(actions.invalidateCreateComment(bool)).toEqual(expectedAction)
      })

      it('to request create comment', () => {
        const bool = true
        const expectedAction = {
          type: types.REQUEST_CREATE_COMMENT,
          isFetching: bool
        }

        expect(actions.requestCreateComment(bool)).toEqual(expectedAction)
      })

      it('to comment has been created', () => {
        const bool = true
        const expectedAction = {
          type: types.COMMENT_HAS_BEEN_CREATED,
          created: bool
        }

        expect(actions.commentHasBeenCreated(bool)).toEqual(expectedAction)
      })
    })
    describe('async actions', () => {
      afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      it('creates COMMENT_HAS_BEEN_CREATED when fetching new comment has been done', () => {
        const comment = {
          id: commentMock.id,
          timestamp: commentMock.timestamp,
          body: commentMock.body,
          author: commentMock.author,
          parentId: commentMock.parentId,
        }
        fetchMock.post(commentCreateUrl, { body: commentMock })
        const expectedActions = [
          { type: types.REQUEST_CREATE_COMMENT, isFetching: true },
          { type: types.COMMENT_HAS_BEEN_CREATED, created: true },
        ]
        const store = mockStore({})
        return store.dispatch(actions.createCommentFetch(comment)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })
  })
})
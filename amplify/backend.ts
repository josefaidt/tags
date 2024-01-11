import { Tags } from 'aws-cdk-lib'
import { defineBackend } from '@aws-amplify/backend'
import { CDKContextKey } from '@aws-amplify/platform-core'
import { auth } from './auth/resource'
import { data } from './data/resource'

const backend = defineBackend({
  auth,
  data,
})

const { node } = backend.auth

const name = node.tryGetContext(CDKContextKey.BACKEND_NAME)
const namespace = node.tryGetContext(CDKContextKey.BACKEND_NAMESPACE)
const type = node.tryGetContext(CDKContextKey.DEPLOYMENT_TYPE)

Tags.of(backend.auth).add('amplify:app-name', name)
Tags.of(backend.auth).add('amplify:app-namespace', namespace)
Tags.of(backend.auth).add('amplify:app-type', type)

Tags.of(backend.data).add('amplify:app-name', name)
Tags.of(backend.data).add('amplify:app-namespace', namespace)
Tags.of(backend.data).add('amplify:app-type', type)

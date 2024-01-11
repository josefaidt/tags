import type { IConstruct } from 'constructs'
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

function tag(scope: IConstruct) {
  Tags.of(scope).add('amplify:app-id', '???')
  Tags.of(scope).add('amplify:app-name', namespace)
  Tags.of(scope).add('amplify:backend-name', name)
  Tags.of(scope).add('amplify:deployment-type', type)
}

tag(backend.auth)
tag(backend.data)

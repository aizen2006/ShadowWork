// Model define the data structure and validation for the request and response
import { t, type UnwrapSchema } from 'elysia'

export const SubmissionModel = {
	submissionBody: t.Object({
		bounty_id: t.Number(),
		submitter_id: t.Number(),
		content: t.String(),
	}),
	submissionResponse: t.Object({
		id: t.Number(),
		bounty_id: t.Number(),
		submitter_id: t.Number(),
		content: t.String(),
	}),
  submissionParams: t.Object({
    id: t.Numeric(),
  }),
} as const

export type SubmissionModel = {
	[k in keyof typeof SubmissionModel]: UnwrapSchema<typeof SubmissionModel[k]>
}
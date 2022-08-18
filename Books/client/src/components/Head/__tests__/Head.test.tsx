import { render, waitFor } from '@/test/test-utils'

import { Head } from '../Head'

test('should add page title and description', async () => {
  const title = 'Hello World | BookHut'
  const description = 'Example description'

  render(<Head title={title} description={description} />)
  await waitFor(() => {
    expect(document.title).toEqual(title)
  })

  const metaDescriptionElem = document.querySelector('meta[name="desciption"]')

  expect(metaDescriptionElem?.getAttribute('content')).toEqual(description)
})

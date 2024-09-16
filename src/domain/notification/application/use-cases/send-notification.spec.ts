import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

import { SendNotificationUseCase } from './send-notification'

let notificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(notificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: 'notification-01',
      title: 'Example title',
      content: 'Example content',
    })

    expect(result.isRight()).toBe(true)
    expect(notificationsRepository.items[0]).toEqual(result.value?.notification)
  })
})

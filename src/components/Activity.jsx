import './components.css'

function Activity({ activity }) {
  const date = new Date(activity.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // L'API envoie "watchlater" ou "favourite".
  let place = 'favorites'
  if (activity.activityType === 'watchlater') {
    place = 'watch later'
  }

  return (
    <li className="activity">
      <p>
        <span className="activity-name">{activity.user.username}</span>
        {' added '}
        <span className="activity-name">{activity.title.title}</span>
        {` to ${place} - ${date}`}
      </p>
    </li>
  )
}

export default Activity

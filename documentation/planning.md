# Discord self-destruct

Ultimate privacy guide & developer implementation docs for those who are **forced to use Discord**, but want to control what they can.

- _Sidenote_: user contribution is also needed:
    - Less spam, try to fit more content into a single message

## API

- API will receive user-agent and Discord token directly from the web extension (maybe automatically sent at first message log)
    - User-agent needs constant updates to avoid Discord API restrictions
- API will queue messages for deletion
- On hitting the delete endpoint, it will respect Discord API limitations
- For now only one user can use the API with authenticating with their Discord token (set as the only accepted token in a .env file)
    - This is to avoid IP restrictions from Discord (service will run from my homelab)
        - Homelab setup even better -> Discord client & API will have the same public IP, less suspicion
- The most important part (I have no technical knowledge for this one yet): **It will automatically queue deletions from the DB**

### Database

- Will use Prisma, preferably with MariaDB (already running on RPI)
    - If only PostgreSQL works or MDB is heavily limited, I will use Postgres instead
- Only if just one user will use the service, expandability is required
    - Storing user data to separate messages and other metadata
- Need a dedicated table for storing user-agent strings, columns follow:
    - UserId
    - UserAgent - always the most up to date one, past data will get overwritten
    - UpdatedAt - stores when it was last updated, will display it on the web extension

## Firefox extension (only works with Discord web)

- Gets browser user-agent & Discord token, sends it to API so it can simulate it
- Modifies messages before sending:
    - Adds **Message will self destruct on: xx** to user's messages
        - Will be toggleable in settings
        - Might be implemented with stimulating discord API calls in the browser before sending them (if that's even possible)
        - Might be implemented with stimulating the rendered HTML on the page, rewriting the message send box / send button (messier, breaks if Discord updates UI)
    - Sends the messages to the API endpoint with parameters like
        - MessageId
        - ChannelId
        - UserId (external table FK reference, not sent with every request)
        - SentOn
        - DeleteOn

## Future plans

- Mobile app, works with Discord mobile client
- Extension might be able to toggle between external / local mode
    - Only after the API works
    - If user doesn't shuts down PC, closes browser: It can delete messages directly, locally
    - In this case, it only stores messages locally

# Wavly Notes

*Open Source Note taking app designed for the community*

---

## Demo/Live Link

- Not avail

## Getting Started

### Prerequisites

- React/NextJS basic understanding
- NodeJS LTS
- Yarn (Requires NPM)

### Installation and Setup

1. **Clone the repository**:
    ```
    git clone https://github.com/wavly/notes
    ```
2. **Navigate to the project directory**:

    ```
     cd notes
    ```

3. **Install dependencies**:

    ```
     yarn install
    ```

Unfortunately, running the app involves more steps than just the ones you have completed. You need to (login/sign up) in [Supabase](https://supabase.com/) and [WorkOS](https://workos.com/). First rename the `.env.example` to `.env`.

In `WorkOS` you need:

- WORKOS_CLIENT_ID
- WORKOS_API_KEY
- WORKOS_REDIRECT_URI

And in `Supabase` you need:

- SUPABASE_URL
- SUPABASE_KEY

Put all the strings one by one in `.env` with its appropriate name.

After that you need to generate a random `base64` string for `JWT_SECRET_KEY`:

```
node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
```

The string that you get by running the above command, you need to put the resulting string in `.env` file: `JWT_SECRET_KEY`

> [!NOTE]
> We will be simplifying this setup to make it easier to get started.

## Project Structure

- Briefly describe the architecture or main components of the project.
- Link to additional documentation or wikis if available.

## Contributing

We welcome contributions to this project! For guidelines on how to contribute, please refer to the [CONTRIBUTING.md](.github/CONTRIBUTING.md) file.

## Acknowledgements and Appreciation

- Express gratitude to contributors, mentors, or anyone who helped with the project.
- You can also list any libraries or tools you used.

## Additional Information

Wavly Notes is [GNUV3](LICENSE) under MIT.

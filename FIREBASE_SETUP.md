# Firebase Setup

1. Create a Firebase project.
2. Add a Web app in Firebase and copy the config values into `.env`.
3. Enable `Authentication -> Sign-in method -> Google`.
4. If Firebase asks for it, set the Google provider project support email while enabling the provider.
5. Add your current domain to `Authentication -> Settings -> Authorized domains`.
6. Open `Build -> Firestore Database`, click `Create database`, and finish the Firestore setup flow.
7. If Google Cloud still shows Firestore as disabled, enable the `Cloud Firestore API` for the same project and wait a few minutes.
8. Make sure you sign in with `lakadbd8@gmail.com`.
9. Open `Build -> Storage`, click `Get started`, and create the default Storage bucket for this project.
10. Open Firestore rules and paste the contents of `firestore.rules`.
11. Open Storage rules and paste the contents of `storage.rules`.
12. Restart the Vite dev server after editing `.env`.
13. Start the app and open `/#/admin`.
14. Sign in with Google, upload your CV/images, edit content, and save.

The public portfolio can be viewed by anyone, but only the owner email in the rules can write to Firestore and Storage.

Free upload alternative:

If you do not want to use Firebase Storage, you can keep Firebase Authentication + Firestore and switch file uploads to Cloudinary.

1. Create a free Cloudinary account.
2. Create an unsigned upload preset.
3. Put these in `.env`:
   `VITE_UPLOAD_PROVIDER=cloudinary`
   `VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name`
   `VITE_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset`
   `VITE_CLOUDINARY_FOLDER=portfolio`
4. Restart the Vite dev server.
5. Upload images and your CV from the admin panel.

Notes:
- This keeps your portfolio content locked behind your Firebase owner account, but Cloudinary unsigned uploads are still a client-side upload method. That means someone who inspects the frontend could potentially upload files to your Cloudinary account, even though they still cannot edit your portfolio content.
- If your CV is a PDF, enable PDF delivery in Cloudinary under `Settings -> Security -> PDF and ZIP files -> Allow delivery of PDF and ZIP files`.
- After enabling that setting, upload the CV again so the portfolio saves a fresh Cloudinary URL.

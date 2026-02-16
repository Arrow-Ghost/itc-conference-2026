// Quick test to check if .env.local is being loaded
console.log('\n=== Environment Variables Check ===\n');

const vars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_API_BASE_URL'
];

let allPresent = true;

vars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allPresent = false;
  }
});

console.log('\n');

if (allPresent) {
  console.log('✅ All environment variables are set!');
  console.log('Your .env.local is being loaded correctly.\n');
} else {
  console.log('❌ Some environment variables are missing!');
  console.log('Make sure .env.local exists and restart dev server.\n');
}

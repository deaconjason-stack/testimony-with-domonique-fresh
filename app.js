const testimonyForm = document.querySelector('#testimonyForm');
const prayerForm = document.querySelector('#prayerForm');
const vaultList = document.querySelector('#vaultList');
const communityGrid = document.querySelector('#communityGrid');
const toast = document.querySelector('#toast');
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

const STORAGE_KEY = 'testimony-with-domonique-vault';

const samples = [
  {
    title: 'Still standing by the grace of God',
    body: 'There were moments I did not know how I would make it, but God kept opening doors, strengthening my mind, and reminding me that my life still had purpose.',
    tag: 'Encouragement'
  },
  {
    title: 'A prayer became a praise report',
    body: 'What started as tears in prayer turned into a testimony of patience, protection, and provision. God did not move on my clock, but He moved right on time.',
    tag: 'Praise Report'
  },
  {
    title: 'Faith through the hard season',
    body: 'The season was heavy, but God used it to teach me wisdom, humility, and endurance. I came out with a stronger faith and a clearer heart.',
    tag: 'Faith'
  }
];

function getVault() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveVault(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;'
  }[char]));
}

function buildDraft() {
  const title = document.querySelector('#title').value.trim();
  const story = document.querySelector('#story').value.trim();
  const lesson = document.querySelector('#lesson').value.trim();
  const audience = document.querySelector('#audience').value;

  if (!title && !story) {
    showToast('Add a title and story first.');
    return null;
  }

  const draftTitle = title || 'My Testimony';
  const draftBody = `I give honor and thanks to God for what He has done in my life. ${story || 'God has brought me through more than I can fully explain.'}\n\nThrough this experience, I learned that ${lesson || 'God is still faithful, even when the road is not easy.'}\n\nThis testimony is shared with humility, gratitude, and faith. My prayer is that somebody who reads it will be encouraged to keep trusting God, keep standing, and keep believing that He is still working.`;

  document.querySelector('#draftTitle').textContent = draftTitle;
  document.querySelector('#draftBody').textContent = draftBody;

  return { title: draftTitle, body: draftBody, audience, type: 'Testimony' };
}

function renderVault() {
  const items = getVault();
  if (!items.length) {
    vaultList.innerHTML = `<article class="vault-item"><h3>No saved testimonies yet.</h3><p>Start your first testimony above. Domonique will help you shape it with care.</p></article>`;
    return;
  }

  vaultList.innerHTML = items.map(item => `
    <article class="vault-item">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body).slice(0, 260)}${item.body.length > 260 ? '…' : ''}</p>
      <div class="meta">
        <span class="pill">${escapeHtml(item.type)}</span>
        <span class="pill">${escapeHtml(item.audience || 'Private')}</span>
        <span class="pill">${escapeHtml(item.date)}</span>
      </div>
    </article>
  `).join('');
}

function renderCommunity() {
  communityGrid.innerHTML = samples.map(item => `
    <article class="community-item">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
      <div class="meta"><span class="pill">${escapeHtml(item.tag)}</span><span class="pill">Pray with them</span></div>
    </article>
  `).join('');
}

document.querySelector('#generateDraft').addEventListener('click', buildDraft);

document.querySelector('#copyDraft').addEventListener('click', async () => {
  const title = document.querySelector('#draftTitle').textContent;
  const body = document.querySelector('#draftBody').textContent;
  await navigator.clipboard.writeText(`${title}\n\n${body}`);
  showToast('Draft copied.');
});

testimonyForm.addEventListener('submit', event => {
  event.preventDefault();
  const draft = buildDraft();
  if (!draft) return;
  const items = getVault();
  items.unshift({ ...draft, date: new Date().toLocaleDateString() });
  saveVault(items);
  testimonyForm.reset();
  renderVault();
  showToast('Testimony saved.');
});

prayerForm.addEventListener('submit', event => {
  event.preventDefault();
  const prayerText = document.querySelector('#prayerText').value.trim();
  if (!prayerText) {
    showToast('Write a prayer note first.');
    return;
  }
  const items = getVault();
  items.unshift({ title: 'Prayer and Praise Note', body: prayerText, audience: 'Private', type: 'Prayer', date: new Date().toLocaleDateString() });
  saveVault(items);
  prayerForm.reset();
  renderVault();
  showToast('Prayer note saved.');
});

document.querySelector('#clearVault').addEventListener('click', () => {
  if (!confirm('Clear saved testimonies and prayer notes from this device?')) return;
  localStorage.removeItem(STORAGE_KEY);
  renderVault();
  showToast('Vault cleared.');
});

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

renderVault();
renderCommunity();

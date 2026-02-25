<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { eventService } from '../services/eventService';
import { newsService } from '../services/newsService';
import { authService } from '../services/authService';
import { useRouter } from 'vue-router';

const router = useRouter();

const events = ref([]);
const newsItems = ref([]);
const activeTab = ref('events'); // 'events' or 'news'
const isModalOpen = ref(false);
const isEditing = ref(false);

const initialFormState = {
  id: null,
  title: '',
  subtitle: '',
  date: '',
  endDate: '',
  badge: '',
  category: '',
  location: '',
  fullDescription: '',
  gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop',
  terms: []
};

const form = reactive({ ...initialFormState });
const newTerm = ref('');

const isLoading = ref(false);

onMounted(async () => {
  await loadEvents();
  await loadNews();
});

const loadNews = async () => {
  isLoading.value = true;
  try {
    newsItems.value = await newsService.getAll();
  } finally {
    isLoading.value = false;
  }
};

const loadEvents = async () => {
  isLoading.value = true;
  try {
    events.value = await eventService.getAll();
  } finally {
    isLoading.value = false;
  }
};

// Computed property for sorted events: Active first, then Ended
const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => {
    const aEnded = eventService.isEventEnded(a.endDate);
    const bEnded = eventService.isEventEnded(b.endDate);
    
    if (aEnded && !bEnded) return 1;
    if (!aEnded && bEnded) return -1;
    return 0;
  });
});

const openAddModal = () => {
  isEditing.value = false;
  Object.assign(form, initialFormState);
  form.terms = [];
  isModalOpen.value = true;
};

const openEditModal = (event) => {
  isEditing.value = true;
  Object.assign(form, event);
  if (!form.terms) form.terms = [];
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const addTerm = () => {
  if (newTerm.value.trim()) {
    form.terms.push(newTerm.value.trim());
    newTerm.value = '';
  }
};

const removeTerm = (index) => {
  form.terms.splice(index, 1);
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this?')) {
    try {
      isLoading.value = true;
      if (activeTab.value === 'events') {
        await eventService.delete(id);
        await loadEvents();
      } else {
        await newsService.delete(id);
        await loadNews();
      }
    } catch (error) {
      alert('Error deleting: ' + error.message);
    } finally {
      isLoading.value = false;
    }
  }
};

const handleSave = async () => {
  try {
    isLoading.value = true;
    if (activeTab.value === 'events') {
      await eventService.save({ ...form });
      await loadEvents();
    } else {
      await newsService.save({ ...form });
      await loadNews();
    }
    closeModal();
  } catch (error) {
    alert('Error saving: ' + error.message);
  } finally {
    isLoading.value = false;
  }
};

const handleReset = async () => {
  if (confirm('Reset all events to original defaults? This will add any missing default events to Supabase.')) {
    try {
      isLoading.value = true;
      await eventService.migrateLocalToSupabase();
      await loadEvents();
    } catch (error) {
      alert('Error resetting events: ' + error.message);
    } finally {
      isLoading.value = false;
    }
  }
};

const handleLogout = async () => {
  try {
    await authService.logout();
    router.push('/login');
  } catch (error) {
    alert('Error logging out: ' + error.message);
  }
};
</script>

<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <h1>{{ activeTab === 'events' ? 'Events Management' : 'News Management' }}</h1>
      <div class="header-actions">
        <button @click="openAddModal" class="btn btn-primary">Add New {{ activeTab === 'events' ? 'Event' : 'News' }}</button>
        <button v-if="activeTab === 'events'" @click="handleReset" class="btn btn-secondary">Reset to Default</button>
        <button @click="handleLogout" class="btn btn-outline">Logout</button>
      </div>
    </header>

    <div class="admin-tabs">
      <button 
        :class="['tab-btn', { active: activeTab === 'events' }]" 
        @click="activeTab = 'events'"
      >
        Events
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'news' }]" 
        @click="activeTab = 'news'"
      >
        News
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total {{ activeTab === 'events' ? 'Events' : 'News' }}</h3>
        <p class="stat-value">{{ activeTab === 'events' ? events.length : newsItems.length }}</p>
      </div>
    </div>

    <div class="list-card">
      <table class="admin-table">
        <thead>
          <tr v-if="activeTab === 'events'">
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          <tr v-else>
            <th>ID</th>
            <th>Title</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="activeTab === 'events'">
            <tr v-for="event in sortedEvents" :key="event.id">
              <td>#{{ event.id }}</td>
              <td><strong>{{ event.title }}</strong></td>
              <td><span class="badge">{{ event.badge }}</span></td>
              <td>{{ event.date }}</td>
              <td>
                <div class="table-actions">
                  <button @click="openEditModal(event)" class="btn-icon">Edit</button>
                  <button @click="handleDelete(event.id)" class="btn-icon delete">Delete</button>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="news in newsItems" :key="news.id">
              <td>#{{ news.id }}</td>
              <td><strong>{{ news.title }}</strong></td>
              <td>{{ news.date }}</td>
              <td>
                <div class="table-actions">
                  <button @click="openEditModal(news)" class="btn-icon">Edit</button>
                  <button @click="handleDelete(news.id)" class="btn-icon delete">Delete</button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <header class="modal-header">
          <h2>{{ isEditing ? 'Edit' : 'Add New' }} {{ activeTab === 'events' ? 'Event' : 'News' }}</h2>
          <button @click="closeModal" class="btn-close">&times;</button>
        </header>
        
        <form @submit.prevent="handleSave" class="admin-form">
          <div v-if="activeTab === 'events'" class="form-grid">
            <div class="form-group">
              <label>Event Title</label>
              <input v-model="form.title" type="text" required placeholder="e.g. Summer Festival">
            </div>
            <div class="form-group">
              <label>Subtitle / Discount Info</label>
              <input v-model="form.subtitle" type="text" placeholder="e.g. Discount up to 70%">
            </div>
            <div class="form-group">
              <label>Display Date</label>
              <input v-model="form.date" type="text" required placeholder="e.g. 15 Aug 2026 | 10:00 - 22:00">
            </div>
            <div class="form-group">
              <label>End Date (YYYY-MM-DD)</label>
              <input v-model="form.endDate" type="date" required>
            </div>
            <div class="form-group">
              <label>Badge Text</label>
              <input v-model="form.badge" type="text" placeholder="e.g. Limited Time">
            </div>
            <div class="form-group">
              <label>Category</label>
              <input v-model="form.category" type="text" placeholder="e.g. Entertainment">
            </div>
            <div class="form-group">
              <label>Location</label>
              <input v-model="form.location" type="text" placeholder="e.g. Atrium Utama">
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input v-model="form.image" type="url">
            </div>
            
            <div class="form-group full-width">
              <label>Full Description</label>
              <textarea v-model="form.fullDescription" rows="4"></textarea>
            </div>

            <div class="form-group full-width">
              <label>Terms & Conditions</label>
              <div class="terms-input-group">
                <input v-model="newTerm" @keyup.enter="addTerm" type="text" placeholder="Add a term and press Enter">
                <button type="button" @click="addTerm" class="btn btn-secondary">Add</button>
              </div>
              <ul class="form-terms-list">
                <li v-for="(term, index) in form.terms" :key="index">
                  {{ term }}
                  <button type="button" @click="removeTerm(index)" class="btn-remove">&times;</button>
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="form-grid">
            <div class="form-group full-width">
              <label>News Title</label>
              <input v-model="form.title" type="text" required placeholder="e.g. Pembukaan Tenant Baru">
            </div>
            <div class="form-group">
              <label>Published Date</label>
              <input v-model="form.date" type="date" required>
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input v-model="form.image" type="url" placeholder="https://...">
            </div>
            <div class="form-group full-width">
              <label>Content</label>
              <textarea v-model="form.content" rows="6" required placeholder="Tulis berita di sini..."></textarea>
            </div>
          </div>

          <footer class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Create' }}</button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.admin-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
  color: #1e293b;
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #10b981;
}

.tab-btn.active {
  color: #10b981;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -0.6rem;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #10b981;
}


.header-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #10b981;
  color: white;
}

.btn-primary:hover {
  background-color: #059669;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #475569;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.btn-outline:hover {
  background-color: #f8fafc;
  color: #ef4444;
  border-color: #ef4444;
}

.stats-grid {
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: fit-content;
  min-width: 200px;
}

.stat-card h3 {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.events-list-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.admin-table th {
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.admin-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.badge {
  background-color: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.625rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.table-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-icon {
  background: none;
  border: none;
  color: #10b981;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-icon.delete {
  color: #ef4444;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: #f8fafc;
  border-radius: 24px;
  width: 100%;
  max-width: 850px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  padding: 1.75rem 2.5rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.btn-close {
  background: #f1f5f9;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #e2e8f0;
  color: #1e293b;
  transform: rotate(90deg);
}

.admin-form {
  padding: 2.5rem;
  overflow-y: auto;
  flex: 1;
}

/* Scrollbar styling for modal */
.admin-form::-webkit-scrollbar {
  width: 8px;
}

.admin-form::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.admin-form::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.admin-form::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  margin-left: 0.25rem;
}

.form-group input, 
.form-group textarea {
  padding: 0.875rem 1.25rem;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #94a3b8;
}

.form-group input:focus, 
.form-group textarea:focus {
  outline: none;
  border-color: #10b981;
  background: white;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

.terms-input-group {
  display: flex;
  gap: 0.75rem;
}

.terms-input-group input {
  flex: 1;
}

.form-terms-list {
  list-style: none;
  padding: 0;
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.form-terms-list li {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.btn-remove {
  background: #fee2e2;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: #fecaca;
  transform: scale(1.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  padding: 1.75rem 2.5rem;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.form-actions .btn {
  padding: 0.875rem 2rem;
  border-radius: 12px;
  min-width: 120px;
}

</style>

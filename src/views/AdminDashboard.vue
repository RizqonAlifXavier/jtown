<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { eventService } from '../services/eventService';

const events = ref([]);
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

onMounted(() => {
  loadEvents();
});

const loadEvents = () => {
  events.value = eventService.getAll();
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

const handleSave = () => {
  eventService.save({ ...form });
  loadEvents();
  closeModal();
};

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this event?')) {
    eventService.delete(id);
    loadEvents();
  }
};

const handleReset = () => {
  if (confirm('Reset all events to original code defaults?')) {
    events.value = eventService.resetToDefaults();
  }
};
</script>

<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <h1>Events Management</h1>
      <div class="header-actions">
        <button @click="openAddModal" class="btn btn-primary">Add New Event</button>
        <button @click="handleReset" class="btn btn-secondary">Reset to Default</button>
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Events</h3>
        <p class="stat-value">{{ events.length }}</p>
      </div>
    </div>

    <div class="events-list-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <header class="modal-header">
          <h2>{{ isEditing ? 'Edit Event' : 'Add New Event' }}</h2>
          <button @click="closeModal" class="btn-close">&times;</button>
        </header>
        
        <form @submit.prevent="handleSave" class="event-form">
          <div class="form-grid">
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

          <footer class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Event' : 'Create Event' }}</button>
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
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.event-form {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: span 2;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.form-group input, 
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus, 
.form-group textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.terms-input-group {
  display: flex;
  gap: 0.5rem;
}

.terms-input-group input {
  flex: 1;
}

.form-terms-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.form-terms-list li {
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-remove {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0;
  font-size: 1.1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}
</style>

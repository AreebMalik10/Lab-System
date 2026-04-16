import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

const SAMPLE_TESTS = [
  { id: 1, dept: 'Hematology', group: 'Routine Blood', name: 'CBC (Complete Blood Count)', abbr: 'CBC', charges: '$45.00' },
  { id: 2, dept: 'Biochemistry', group: 'Liver Profile', name: 'LFT (Liver Function Test)', abbr: 'LFT', charges: '$85.00' },
  { id: 3, dept: 'Biochemistry', group: 'Diabetic', name: 'HbA1c (Glycated Hemoglobin)', abbr: 'HbA1c', charges: '$60.00' },
  { id: 4, dept: 'Immunology', group: 'Thyroid', name: 'TSH (Thyroid Stimulating Hormone)', abbr: 'TSH', charges: '$55.00' },
  { id: 5, dept: 'Biochemistry', group: 'Renal Profile', name: 'Kidney Function Test (KFT)', abbr: 'KFT', charges: '$75.00' },
]

export default function Reception(){
  const [selected, setSelected] = useState(new Set())
  const [form, setForm] = useState({ fullName: 'John Doe', age: '28', gender: 'Male', phone: '+1 234 567 890', email: 'john.doe@example.com', hospital: "St. Mary's Medical Center", ward: 'ICU - Bed 14', relation: 'Self' })
  const [query, setQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [records, setRecords] = useState([])
  const [editingId, setEditingId] = useState(null)

  function toggle(id){
    const next = new Set(selected)
    if(next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  function saveRecord(){
    const payload = { id: editingId || Date.now(), form: { ...form }, tests: Array.from(selected) }
    if(editingId){
      setRecords(r => r.map(x => x.id === editingId ? payload : x))
      window.alert('Record updated')
    } else {
      setRecords(r => [payload, ...r])
      window.alert('Record saved')
    }
    setEditingId(null)
  }

  function newRecord(){
    setForm({ fullName: '', age: '', gender: '', phone: '', email: '', hospital: '', ward: '', relation: '' })
    setSelected(new Set())
    setEditingId(null)
  }

  function loadRecord(id){
    const rec = records.find(r=>r.id===id)
    if(!rec) return
    setForm(rec.form)
    setSelected(new Set(rec.tests))
    setEditingId(rec.id)
  }

  const departments = ['All', ...Array.from(new Set(SAMPLE_TESTS.map(t=>t.dept)))]
  const filteredTests = SAMPLE_TESTS.filter(t => (departmentFilter === 'All' || t.dept === departmentFilter) && (t.name.toLowerCase().includes(query.toLowerCase()) || t.dept.toLowerCase().includes(query.toLowerCase())))

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100%', boxSizing: 'border-box' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight:700, mb: 2 }}>Patient Reception</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p:3.5, borderRadius:2, boxShadow: 1 }} elevation={0}>
              <Typography sx={{ fontWeight:700, mb:2 }}>Patient Demographics</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Full Name</Typography>
                  <TextField size="small" fullWidth value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Age</Typography>
                  <TextField size="small" fullWidth value={form.age} onChange={e=>setForm({...form, age: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Gender</Typography>
                  <TextField size="small" fullWidth value={form.gender} onChange={e=>setForm({...form, gender: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Phone Number</Typography>
                  <TextField size="small" fullWidth value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Email</Typography>
                  <TextField size="small" fullWidth value={form.email} onChange={e=>setForm({...form, email: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Hospital / Clinic</Typography>
                  <TextField size="small" fullWidth value={form.hospital} onChange={e=>setForm({...form, hospital: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Ward / Unit</Typography>
                  <TextField size="small" fullWidth value={form.ward} onChange={e=>setForm({...form, ward: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: 12, color: '#475569', mb:0.5 }}>Relation</Typography>
                  <TextField size="small" fullWidth value={form.relation} onChange={e=>setForm({...form, relation: e.target.value})}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f1f5f9', borderRadius:1 } }} />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt:3 }}>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" onClick={saveRecord} sx={{ bgcolor: '#1d4ed8', py:1.25, fontWeight:700 }}>{editingId? 'Update Record':'Save Record'}</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" onClick={newRecord} sx={{ py:1.25, fontWeight:700 }}>New Record</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" startIcon={<SearchIcon />} sx={{ py:1 }}>Search</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" sx={{ py:1 }}>Receipt Print</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p:2, borderRadius:2, boxShadow:1 }} elevation={0}>
              <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:1 }}>
                <Typography sx={{ fontWeight:700 }}>Test Selection</Typography>
                <Box sx={{ display:'flex', gap:1, alignItems:'center' }}>
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="dept-label">Department</InputLabel>
                    <Select labelId="dept-label" label="Department" value={departmentFilter} onChange={e=>setDepartmentFilter(e.target.value)}>
                      {departments.map(d=> <MenuItem key={d} value={d}>{d}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField size="small" placeholder="Search test..." value={query} onChange={e=>setQuery(e.target.value)}
                    InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon fontSize="small"/></InputAdornment>) }} sx={{ width: 220 }} />
                </Box>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell>Department</TableCell>
                    <TableCell>Group</TableCell>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Abbr</TableCell>
                    <TableCell align="right">Charges</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTests.map(t => (
                    <TableRow key={t.id} hover>
                      <TableCell padding="checkbox"><Checkbox checked={selected.has(t.id)} onChange={()=>toggle(t.id)} /></TableCell>
                      <TableCell sx={{ color: '#1d4ed8', fontWeight:600 }}>{t.dept}</TableCell>
                      <TableCell>{t.group}</TableCell>
                      <TableCell sx={{ fontWeight:700 }}>{t.name}</TableCell>
                      <TableCell>{t.abbr}</TableCell>
                      <TableCell align="right">{t.charges}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt:3 }}>
          <Paper sx={{ p:2, borderRadius:2 }} elevation={0}>
            <Typography sx={{ fontWeight:700, mb:1 }}>Saved Records ({records.length})</Typography>
            {records.length === 0 ? (
              <Typography sx={{ color: '#64748b' }}>No saved records yet.</Typography>
            ) : (
              <List>
                {records.map(r => (
                  <ListItemButton key={r.id} onClick={()=>loadRecord(r.id)} secondaryAction={
                    <IconButton edge="end" onClick={(e)=>{ e.stopPropagation(); loadRecord(r.id) }}>
                      <EditIcon />
                    </IconButton>
                  }>
                    <ListItemText primary={r.form.fullName || '(no name)'} secondary={`${r.tests.length} tests — ${new Date(r.id).toLocaleString()}`} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

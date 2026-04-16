import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined'
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

// ─── helpers ────────────────────────────────────────────────────────────────

function now() {
  return new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, badge, badgeColor, progress, progressColor }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e5e7eb', borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: 1.5,
          bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </Box>
        {badge && (
          <Typography sx={{
            fontSize: 10.5, fontWeight: 700, px: 1, py: 0.3, borderRadius: 1,
            bgcolor: badgeColor === 'orange' ? '#fff7ed' : badgeColor === 'blue' ? '#eff6ff' : '#f0fdf4',
            color: badgeColor === 'orange' ? '#ea580c' : badgeColor === 'blue' ? '#2563eb' : '#16a34a',
          }}>
            {badge}
          </Typography>
        )}
      </Box>
      <Typography sx={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
        {value}
      </Typography>
      {/* progress bar */}
      <Box sx={{ mt: 1.5, height: 4, bgcolor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{
          height: '100%',
          width: `${progress}%`,
          bgcolor: progressColor || '#1d4ed8',
          borderRadius: 4,
        }} />
      </Box>
    </Paper>
  )
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────

const DAILY_DATA = [
  { day: 'MON', done: 60, pending: 20 },
  { day: 'TUE', done: 70, pending: 25 },
  { day: 'WED', done: 90, pending: 35 },
  { day: 'THU', done: 65, pending: 22 },
  { day: 'FRI', done: 75, pending: 28 },
  { day: 'SAT', done: 45, pending: 15 },
  { day: 'SUN', done: 30, pending: 10 },
]

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.done + d.pending))
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 200, mt: 3, px: 1 }}>
      {data.map(d => {
        const total = d.done + d.pending
        const totalH = (total / max) * 180
        const doneH = (d.done / max) * 180
        const pendingH = (d.pending / max) * 180
        return (
          <Box key={d.day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {/* pending (top, lighter) */}
              <Box sx={{ width: '70%', height: pendingH, bgcolor: '#dbeafe', borderRadius: '4px 4px 0 0' }} />
              {/* done (bottom, dark) */}
              <Box sx={{ width: '70%', height: doneH, bgcolor: '#1d4ed8', borderRadius: '0 0 4px 4px' }} />
            </Box>
            <Typography sx={{ fontSize: 10, color: '#94a3b8', mt: 0.5, letterSpacing: 0.3 }}>{d.day}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [chartMode, setChartMode] = useState('daily')

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column',
      gap: { xs: 2, md: 3 },
      ml: { xs: 0, md: 2 },
      mr: { xs: 0, md: 2 },
      p: 3,
      bgcolor: '#f8fafc',
      boxSizing: 'border-box',
    }}>

      {/* Top bar */}
      <Box sx={{ width: '100%', mb: 0.5 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
        }}>
          <Box>
            <Typography sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, fontWeight: 800, color: '#0f172a' }}>
              System Overview
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#64748b', mt: 0.5 }}>{now()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: { xs: 1, sm: 0 } }}>
            <Button
              startIcon={<PersonAddOutlinedIcon fontSize="small" />}
              variant="outlined" size="small"
              sx={{ borderColor: '#cbd5e1', color: '#334155', fontSize: 12, borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
            >Add Patient</Button>
            <Button
              startIcon={<AssessmentOutlinedIcon fontSize="small" />}
              variant="outlined" size="small"
              sx={{ borderColor: '#cbd5e1', color: '#334155', fontSize: 12, borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
            >View Reports</Button>
            <Button
              endIcon={<ArrowForwardIcon fontSize="small" />}
              variant="contained" size="small"
              sx={{ bgcolor: '#1d4ed8', '&:hover': { bgcolor: '#1e40af' }, fontSize: 12, borderRadius: 1.5, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
            >Go to Reception</Button>
          </Box>
        </Box>
      </Box>

      {/* Stat Cards — CSS grid, auto-fit like reference */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: { xs: 2, md: 3 },
        width: '100%',
      }}>
        <StatCard icon={<PeopleAltOutlinedIcon sx={{ fontSize: 20, color: '#1d4ed8' }} />}
          label="Total Patients" value="1,284" badge="+12%" badgeColor="green" progress={70} progressColor="#1d4ed8" />
        <StatCard icon={<MonitorOutlinedIcon sx={{ fontSize: 20, color: '#1d4ed8' }} />}
          label="Tests Performed" value="5,492" badge="+8%" badgeColor="green" progress={55} progressColor="#64748b" />
        <StatCard icon={<AssignmentLateOutlinedIcon sx={{ fontSize: 20, color: '#ea580c' }} />}
          label="Pending Tests" value="42" badge="Urgent" badgeColor="orange" progress={30} progressColor="#ea580c" />
        <StatCard icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: 20, color: '#1d4ed8' }} />}
          label="Today's Earnings" value="$4,120" badge="Daily Goal" badgeColor="blue" progress={82} progressColor="#1d4ed8" />
      </Box>

      {/* Main content row — flex row like reference */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 2, md: 3 },
        width: '100%',
      }}>

        {/* Workload Analysis — 70% */}
        <Box sx={{ flex: { xs: '1', lg: '7' }, minWidth: 0 }}>
          <Paper elevation={0} sx={{
            p: 3, border: '1px solid #e5e7eb', borderRadius: 3,
            boxShadow: '0px 10px 60px 0px rgba(226, 236, 249, 0.5)',
            height: '100%', display: 'flex', flexDirection: 'column',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>Workload Analysis</Typography>
                <Typography sx={{ fontSize: 12, color: '#94a3b8', mt: 0.25 }}>Monitoring laboratory test volume over time</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, border: '1px solid #e2e8f0', borderRadius: 1.5, p: 0.3 }}>
                {['daily', 'monthly'].map(m => (
                  <Button key={m} size="small" onClick={() => setChartMode(m)}
                    sx={{
                      minWidth: 0, px: 1.5, py: 0.4, fontSize: 11, fontWeight: 600, borderRadius: 1.2,
                      textTransform: 'uppercase', letterSpacing: 0.5,
                      bgcolor: chartMode === m ? '#1d4ed8' : 'transparent',
                      color: chartMode === m ? '#fff' : '#64748b',
                      '&:hover': { bgcolor: chartMode === m ? '#1d4ed8' : '#f1f5f9' },
                    }}
                  >{m}</Button>
                ))}
              </Box>
            </Box>

            <BarChart data={DAILY_DATA} />

            <Divider sx={{ mt: 2, mb: 2 }} />

            {/* Bottom stats */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TrendingUpIcon sx={{ color: '#16a34a', fontSize: 20 }} />
                <Box>
                  <Typography sx={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.6 }}>Average Efficiency</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.7 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>98.4%</Typography>
                    <Typography sx={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>+1.2% vs last week</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AddBoxOutlinedIcon sx={{ color: '#1d4ed8', fontSize: 20 }} />
                <Box>
                  <Typography sx={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.6 }}>Peak Hours</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.7 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>08:00 – 11:00</Typography>
                    <Typography sx={{ fontSize: 11, color: '#64748b' }}>Standard morning rush</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Accounts Registry — 30% */}
        <Box sx={{ flex: { xs: '1', lg: '3.4' }, minWidth: 0 }}>
          <Paper elevation={0} sx={{
            p: 3, border: '1px solid #e5e7eb', borderRadius: 3,
            boxShadow: '0px 10px 60px 0px rgba(226, 236, 249, 0.5)',
            height: '100%', display: 'flex', flexDirection: 'column',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 18, color: '#1d4ed8' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Accounts Registry</Typography>
            </Box>

            <Divider sx={{ mb: 2, borderColor: '#000' }} />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[
                { label: "TODAY'S CASH FLOW",     value: '$4,120.50',   sub: null,            trend: null,         trendColor: null },
                { label: 'MONTHLY REVENUE (OCT)', value: '$124,580.00', sub: '82% of target', trend: null,         trendColor: null },
                { label: 'TOTAL LAB VALUATION',   value: '$2.4M',       sub: null,            trend: '+18.5% YOY', trendColor: '#16a34a' },
              ].map((row, i) => (
                <Box key={i}>
                  <Typography sx={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.5 }}>
                    {row.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 24, color: '#0f172a' }}>{row.value}</Typography>
                    {row.sub && <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{row.sub}</Typography>}
                    {row.trend && <Typography sx={{ fontSize: 11, fontWeight: 700, color: row.trendColor }}>{row.trend}</Typography>}
                  </Box>
                  {i < 2 && <Divider sx={{ mt: 2, mb: 2 }} />}
                </Box>
              ))}
            </Box>

            <Button
              fullWidth endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{
                mt: 3, fontSize: 12, fontWeight: 600, color: '#1d4ed8', textTransform: 'none',
                border: '1px solid #dbeafe', borderRadius: 1.5, py: 1,
                '&:hover': { bgcolor: '#eff6ff' },
              }}
            >View Full Accounts</Button>
          </Paper>
        </Box>

      </Box>
    </Box>
  )
}

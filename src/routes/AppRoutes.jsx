import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Layout, SeoManager } from "@/components/site/Layout";
import OnlineConsultation from "@/pages/OnlineConsultation";
import { doctors } from "@/data/siteContent";
import {
  CardiologyMultanPage,
  Contact,
  ContentAdminPage,
  Departments,
  DepartmentDetailPage,
  DiabetesCareMultanPage,
  DoctorsPage,
  EntEmergencyMultanPage,
  GynecologyMultanPage,
  HealthArticlePage,
  HealthLibraryPage,
  Home,
  PediatricCareMultanPage,
  PhysiotherapyMultanPage,
  ReportsPage,
  SameDayUltrasoundMultanPage,
} from "@/pages/SitePages";

export default function AppRoutes() {
  return (
    <Router>
      <SeoManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="departments" element={<Departments />} />
          <Route path="departments/:deptName" element={<DepartmentDetailPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="online-consultation" element={<OnlineConsultation doctors={doctors} />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="health-library" element={<HealthLibraryPage />} />
          <Route path="health-library/:slug" element={<HealthArticlePage />} />
          <Route path="gynecology-multan" element={<GynecologyMultanPage />} />
          <Route path="cardiology-multan" element={<CardiologyMultanPage />} />
          <Route path="ent-emergency-multan" element={<EntEmergencyMultanPage />} />
          <Route path="same-day-ultrasound-multan" element={<SameDayUltrasoundMultanPage />} />
          <Route path="pediatric-care-multan" element={<PediatricCareMultanPage />} />
          <Route path="diabetes-care-multan" element={<DiabetesCareMultanPage />} />
          <Route path="physiotherapy-multan" element={<PhysiotherapyMultanPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin/content" element={<ContentAdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();

        if ($students->count() > 0) {
            return response()->json([
                'status' => 200,
                'students' => $students,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'students' => 'Data Tidak Ditemukan'
            ], 404);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'nis' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|digits:11',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 442,
                'errors' => $validator->messages()
            ], 442);
        } else {
            $student = Student::create([
                'name' => $request->name,
                'nis' => $request->nis,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if ($student) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Student created successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Something went wrong'
                ], 404);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Student::find($id);
        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'Data Ditemukan',
                'data' => $data
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'nis' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|digits:11',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 442,
                'errors' => $validator->messages()
            ], 442);
        } else {
            $student = Student::find($id);
            if ($student) {

                $student->update([
                    'name' => $request->name,
                    'nis' => $request->nis,
                    'email' => $request->email,
                    'phone' => $request->phone,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Student updated successfully'
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No such student found'
                ], 404);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::find($id);
        if($student) {

            $student->delete();

            return response()->json([
                'status' => true,
                'message' => 'Success delete data',
            ]);

        } else {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ]);
        }
    }
}
